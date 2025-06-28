import useEmblaCarousel, {
  type UseEmblaCarouselType,
} from "embla-carousel-react";
import * as React from "react";
import { FaArrowLeft, FaArrowRight, FaCheck } from "react-icons/fa6";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type CarouselApi = UseEmblaCarouselType[1];
type UseCarouselParameters = Parameters<typeof useEmblaCarousel>;
type CarouselOptions = UseCarouselParameters[0];
type CarouselPlugin = UseCarouselParameters[1];

type CarouselProps = {
  opts?: CarouselOptions;
  plugins?: CarouselPlugin;
  orientation?: "horizontal" | "vertical";
  setApi?: (api: CarouselApi) => void;
  onClose?: () => void;
};

type CarouselContextProps = {
  carouselRef: ReturnType<typeof useEmblaCarousel>[0];
  api: ReturnType<typeof useEmblaCarousel>[1];
  scrollPrev: () => void;
  scrollNext: () => void;
  canScrollPrev: boolean;
  canScrollNext: boolean;
  onClose?: () => void;
} & CarouselProps;

const CarouselContext = React.createContext<CarouselContextProps | null>(null);

function useCarousel() {
  const context = React.useContext(CarouselContext);

  if (!context) {
    throw new Error("useCarousel must be used within a <Carousel />");
  }

  return context;
}

const Carousel = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & CarouselProps
>(
  (
    {
      orientation = "horizontal",
      opts,
      setApi,
      plugins,
      className,
      children,
      onClick,
      onClose,
      ...props
    },
    ref
  ) => {
    const [carouselRef, api] = useEmblaCarousel(
      {
        ...opts,
        axis: orientation === "horizontal" ? "x" : "y",
      },
      plugins
    );
    const [canScrollPrev, setCanScrollPrev] = React.useState(false);
    const [canScrollNext, setCanScrollNext] = React.useState(false);

    const onSelect = React.useCallback((api: CarouselApi) => {
      if (!api) {
        return;
      }

      setCanScrollPrev(api.canScrollPrev());
      setCanScrollNext(api.canScrollNext());
    }, []);

    const scrollPrev = React.useCallback(() => {
      api?.scrollPrev();
    }, [api]);

    const scrollNext = React.useCallback(() => {
      api?.scrollNext();
    }, [api]);

    const handleKeyDown = React.useCallback(
      (event: React.KeyboardEvent<HTMLDivElement>) => {
        if (event.key === "ArrowLeft") {
          event.preventDefault();
          scrollPrev();
        } else if (event.key === "ArrowRight") {
          event.preventDefault();
          scrollNext();
        }
      },
      [scrollPrev, scrollNext]
    );

    React.useEffect(() => {
      if (!api || !setApi) {
        return;
      }

      setApi(api);
    }, [api, setApi]);

    React.useEffect(() => {
      if (!api) {
        return;
      }

      onSelect(api);
      api.on("reInit", onSelect);
      api.on("select", onSelect);

      return () => {
        api?.off("select", onSelect);
      };
    }, [api, onSelect]);

    return (
      <CarouselContext.Provider
        value={{
          carouselRef,
          api: api,
          opts,
          orientation:
            orientation || (opts?.axis === "y" ? "vertical" : "horizontal"),
          scrollPrev,
          scrollNext,
          canScrollPrev,
          canScrollNext,
          onClose, // Provide onClose through context
        }}
      >
        <div
          ref={ref}
          onKeyDownCapture={handleKeyDown}
          className={cn("relative", className)}
          role="region"
          aria-roledescription="carousel"
          {...props}
        >
          {children}
        </div>
      </CarouselContext.Provider>
    );
  }
);
Carousel.displayName = "Carousel";

const CarouselContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const { carouselRef, orientation } = useCarousel();

  return (
    <div ref={carouselRef} className="overflow-hidden">
      <div
        ref={ref}
        className={cn(
          "flex",
          orientation === "horizontal" ? "-ml-4" : "-mt-4 flex-col",
          className
        )}
        {...props}
      />
    </div>
  );
});
CarouselContent.displayName = "CarouselContent";

const CarouselItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const { orientation } = useCarousel();

  return (
    <div
      ref={ref}
      role="group"
      aria-roledescription="slide"
      className={cn(
        "min-w-0 shrink-0 grow-0 basis-full",
        orientation === "horizontal" ? "pl-4" : "pt-4",
        className
      )}
      {...props}
    />
  );
});
CarouselItem.displayName = "CarouselItem";

const CarouselPrevious = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<typeof Button>
>(({ className, variant = "outline", size = "icon", ...props }, ref) => {
  const { orientation, scrollPrev, canScrollPrev, canScrollNext } =
    useCarousel();

  return (
    <Button
      ref={ref}
      variant={variant}
      size={size}
      className={cn(
        "absolute h-8 w-10 rounded-full shadow-xl",
        orientation === "horizontal"
          ? "bottom-5 left-5"
          : "-bottom-12 left-1/2 -translate-x-1/2 rotate-90",
        (!canScrollPrev || !canScrollNext) && "hidden",
        className
      )}
      disabled={!canScrollPrev}
      onClick={scrollPrev}
      {...props}
    >
      <FaArrowLeft className="h-3 w-3" />
      <span className="sr-only">Previous slide</span>
    </Button>
  );
});
CarouselPrevious.displayName = "CarouselPrevious";

const CarouselNext = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<typeof Button>
>(({ className, variant = "outline", size = "icon", ...props }, ref) => {
  const {
    orientation,
    scrollNext,
    canScrollNext,
    canScrollPrev,
    api,
    onClose,
  } = useCarousel();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);
  const [showButton, setShowButton] = React.useState(false);

  React.useEffect(() => {
    if (!api) return;

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap());

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api, count]);

  React.useEffect(() => {
    if (current === count - 1) {
      // Checking if the current slide is the last slide
      setShowButton(false); // Hide button if on the last slide
      const timer = setTimeout(() => {
        setShowButton(true);
      }, 12000);

      return () => {
        clearTimeout(timer);
      };
    } else {
      setShowButton(true); // Hide button if not on the last slide
    }
  }, [current, count]);

  if (!showButton) {
    return null;
  }

  return (
    <>
      <Button
        ref={ref}
        className={cn(
          "absolute flex h-9 w-28 gap-1 rounded-full bg-slate-900 text-white shadow-lg active:bg-slate-900 active:text-white",
          orientation === "horizontal"
            ? "bottom-5 right-5"
            : "-bottom-12 left-1/2 -translate-x-1/2 rotate-90",
          (!canScrollNext || !canScrollPrev) && "hidden",
          className
        )}
        onClick={scrollNext}
        {...props}
      >
        <p>Suivant</p>
        <FaArrowRight className="h-3 w-3" />
        <span className="sr-only">Suivant</span>
      </Button>
      <Button
        ref={ref}
        className={cn(
          "group absolute flex h-9 w-3/4 rounded-full bg-slate-900 text-white shadow-lg active:bg-slate-900 active:text-white",
          orientation === "horizontal"
            ? "bottom-5 left-1/2 -translate-x-1/2 transform "
            : "-bottom-12 left-1/2 -translate-x-1/2 rotate-90",
          canScrollPrev && "hidden",
          className
        )}
        onClick={scrollNext}
        {...props}
      >
        <p>Commencer</p>
        <FaArrowRight className=" ml-2 h-3 w-3 transition-all ease-in-out group-hover:animate-fadeinleft" />
        <span className="sr-only">Commencer</span>
      </Button>
      <Button
        ref={ref}
        className={cn(
          "absolute flex h-9 w-3/4 rounded-full bg-slate-900 text-white shadow-lg active:bg-slate-900 active:text-white",
          orientation === "horizontal"
            ? "bottom-5 left-1/2 -translate-x-1/2 transform" // Center horizontally
            : "-bottom-12 left-1/2 -translate-x-1/2 rotate-90", // Center horizontally
          canScrollNext && "hidden",
          className
        )}
        onClick={onClose}
        {...props}
      >
        <p>Terminé</p>
        <FaCheck className="ml-2 h-3 w-3" />
        <span className="sr-only">Terminé</span>
      </Button>
    </>
  );
});
CarouselNext.displayName = "CarouselNext";

export {
  type CarouselApi,
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
};
