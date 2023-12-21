import NavigationAction from "@/components/navigation/NavigationAction";
import NavigationItem from "@/components/navigation/NavigationItem";
import { ModeToggle } from "@/components/shared/ModeToggle";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { UserButton } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export const revalidate = 0

const NavigationSidebar = async () => {
  const profile = await currentProfile();

  if (!profile) return redirect("/");

  const servers = await db.server.findMany({
    where: {
      members: {
        some: {
          profileId: profile.id,
        },
      },
    },
  });

  return (
    <div className="flexCol h-full w-full items-center gap-y-4 bg-[#E3E5E8] py-3 text-primary dark:bg-[#1E1F22]">
      <NavigationAction />
      <Separator className="mx-auto h-[2px] w-10 rounded-md bg-zinc-300 dark:bg-zinc-700" />

      <ScrollArea className="w-full flex-1">
        {servers.map(({ id, name, imageUrl }) => (
          <div key={id} className="mb-4">
            <NavigationItem id={id} name={name} imageUrl={imageUrl} />
          </div>
        ))}
      </ScrollArea>

      <div className="flexCol mt-auto items-center gap-y-4 pb-3">
        <ModeToggle />
        <UserButton
          afterSignOutUrl="/"
          appearance={{
            elements: {
              avatarBox: "h-[48px] w-[48px]",
            },
          }}
        />
      </div>
    </div>
  );
};

export default NavigationSidebar;
