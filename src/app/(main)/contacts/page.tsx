import { ContactsTable } from "./_components/customer-table";
import { auth } from "~/server/auth";

export default async function Contacts() {
  const session = await auth();
  const user = session?.user;
  return <ContactsTable user={user} />;
}
