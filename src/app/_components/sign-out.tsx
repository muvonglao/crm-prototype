import { signOut } from "~/server/auth";

export function SignOut() {
  return (
    <form
      action={async () => {
        "use server";
        await signOut();
      }}
    >
      <button type="submit">Sign Out with Google</button>
    </form>
  );
}
