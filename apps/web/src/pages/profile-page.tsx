import DashboardComponent from "@/components/dashboard-component";
import { Navbar } from "@/components/navbar";
import NewSessionButton from "@/components/new-session-button";

const ProfilePage = () => {
  return (
    <div>
      <Navbar />
      <main className="container mx-auto my-0 flex h-dvh max-w-lg flex-col">
        <div className="pt-10 ">
          <h1 className="mb-5 text-4xl font-semibold tracking-tighter sm:text-5xl md:text-6xl/none">
            Mon profil
          </h1>
        </div>
        <DashboardComponent />
        <NewSessionButton />
      </main>
    </div>
  );
};

export default ProfilePage;
