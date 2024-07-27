import { signIn } from "~/server/auth";

export function SignIn() {
  return (
    <form
      action={async () => {
        "use server";
        await signIn("google");
      }}
    >
      <button type="submit">Login with Google</button>
    </form>
  );
}
