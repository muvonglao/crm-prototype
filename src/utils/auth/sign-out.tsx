import { signOut } from "~/server/auth";

export function SignOut() {
  return (
    <form
      action={async () => {
        "use server";
        await signOut();
      }}
    >
      <button type="submit">Logout</button>
    </form>
  );
}
