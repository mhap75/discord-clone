import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";

const Clerk = ({ children }: { children: React.ReactNode }) => {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: dark,
      }}
    >
      {children}
    </ClerkProvider>
  );
};

export default Clerk;
