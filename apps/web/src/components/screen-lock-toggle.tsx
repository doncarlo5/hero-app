import { LockClosedIcon, LockOpen1Icon } from "@radix-ui/react-icons";
import useWakeLock from "react-use-wake-lock";
import { useToast } from "@/components/ui/use-toast";

const ScreenLockToggle = () => {
  const { isLocked, request, release } = useWakeLock();
  const { toast } = useToast();

  const handleLockScreen = () => {
    if (isLocked) {
      release();
      toast({
        title: "Allumage forcé: OFF",
        description: "Votre écran peut s'éteindre.",
        variant: "default",
      });
    } else {
      request();
      toast({
        title: "Allumage forcé: ON",
        description: "Votre écran restera allumé.",
        variant: "success",
      });
    }
  };

  return (
    <button type="button" onClick={handleLockScreen}>
      {isLocked ? <LockClosedIcon className="h-6 w-6" /> : <LockOpen1Icon className="h-6 w-6" />}
    </button>
  );
};

export default ScreenLockToggle;
