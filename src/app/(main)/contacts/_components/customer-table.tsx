"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "~/components/ui/sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { Button } from "~/components/ui/button";
import { Badge } from "~/components/ui/badge";
import { Skeleton } from "~/components/ui/skeleton";
import { ListFilter, File } from "lucide-react";
import Image from "next/image";
import { api } from "~/trpc/react";

interface User {
  id?: string;
  name?: string | null;
  email?: string | null;
  image?: string | null;
  currentTeamId?: number | null;
}

interface ContactsTable {
  user: User | undefined;
}

function SkeletonRow() {
  return (
    <TableRow>
      <TableCell>
        <div className="h-4 w-28 animate-pulse rounded-md bg-gray-200" />
        <div className="mt-2 hidden h-3 w-40 animate-pulse rounded-md bg-gray-200 md:block" />
      </TableCell>
      <TableCell className="hidden sm:table-cell">
        <div className="h-4 w-20 animate-pulse rounded-md bg-gray-200" />
      </TableCell>
      <TableCell className="hidden lg:table-cell">
        <div className="h-4 w-16 animate-pulse rounded-md bg-gray-200" />
      </TableCell>
      <TableCell className="text-right">
        <div className="ml-auto h-4 w-16 animate-pulse rounded-md bg-gray-200" />
      </TableCell>
    </TableRow>
  );
}

export function ContactsTable({ user }: ContactsTable) {
  const {
    data: contactList,
    error,
    isLoading,
  } = api.contacts.getContacts.useQuery(
    {
      teamId: user?.currentTeamId,
    },
    {
      enabled: !!user?.currentTeamId,
    },
  );
  console.log(contactList);

  return (
    <Tabs defaultValue="week">
      <div className="flex items-center">
        <TabsList>
          <TabsTrigger value="week">Table</TabsTrigger>
          <TabsTrigger value="month">Pipeline</TabsTrigger>
          <TabsTrigger value="year">Forecast</TabsTrigger>
        </TabsList>
        <div className="ml-auto flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="h-7 gap-1 text-sm">
                <ListFilter className="h-3.5 w-3.5" />
                <span className="sr-only sm:not-sr-only">Filter</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Filter by</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuCheckboxItem checked>
                Fulfilled
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem>Declined</DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem>Refunded</DropdownMenuCheckboxItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button size="sm" variant="outline" className="h-7 gap-1 text-sm">
            <File className="h-3.5 w-3.5" />
            <span className="sr-only sm:not-sr-only">Export</span>
          </Button>
        </div>
      </div>
      <TabsContent value="week">
        <Card
          x-chunk="dashboard-05-chunk-3"
          className="h-[calc(100vh-138px)] overflow-auto"
        >
          <CardHeader className="sticky top-0 bg-card px-7">
            <CardTitle>Contacts</CardTitle>
            <CardDescription>Recent orders from your store.</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader className="sticky top-[98px] bg-background/80 backdrop-blur-md">
                <TableRow>
                  <TableHead>Customer</TableHead>
                  <TableHead className="hidden sm:table-cell">
                    Company
                  </TableHead>
                  <TableHead className="hidden lg:table-cell">Type</TableHead>
                  <TableHead className="text-right">Phone</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading
                  ? Array.from({ length: 9 }).map((_, index) => (
                      <SkeletonRow key={index} />
                    ))
                  : contactList?.map((contact, index) => {
                      return (
                        <Sheet key={index}>
                          <SheetTrigger asChild>
                            <TableRow className="hover:cursor-pointer">
                              <TableCell>
                                <div className="font-medium">
                                  {contact.name ?? "-"}
                                </div>
                                <div className="hidden text-sm text-muted-foreground md:block">
                                  {contact.email ?? "-"}
                                </div>
                              </TableCell>
                              <TableCell className="hidden sm:table-cell">
                                <Badge className="text-xs" variant="secondary">
                                  {contact.company ?? "-"}
                                </Badge>
                              </TableCell>
                              <TableCell className="hidden lg:table-cell">
                                {contact.type ?? "-"}
                              </TableCell>
                              <TableCell className="text-right">
                                {contact.phone ?? "-"}
                              </TableCell>
                            </TableRow>
                          </SheetTrigger>
                          <SheetContent>
                            <SheetHeader>
                              <SheetTitle>Edit profile</SheetTitle>
                              <SheetDescription>
                                Make changes to your profile here. Click save
                                when you're done.
                              </SheetDescription>
                            </SheetHeader>
                            <div className="grid gap-4 py-4">
                              <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="name" className="text-right">
                                  Name
                                </Label>
                                <Input
                                  id="name"
                                  value="Pedro Duarte"
                                  className="col-span-3"
                                />
                              </div>
                              <div className="grid grid-cols-4 items-center gap-4">
                                <Label
                                  htmlFor="username"
                                  className="text-right"
                                >
                                  Username
                                </Label>
                                <Input
                                  id="username"
                                  value="@peduarte"
                                  className="col-span-3"
                                />
                              </div>
                            </div>
                            <SheetFooter>
                              <SheetClose asChild>
                                <Button type="submit">Save changes</Button>
                              </SheetClose>
                            </SheetFooter>
                          </SheetContent>
                        </Sheet>
                      );
                    })}
                {/* <TableRow className="bg-accent">
                  <TableCell>
                    <div className="font-medium">Liam Johnson</div>
                    <div className="hidden text-sm text-muted-foreground md:inline">
                      liam@example.com
                    </div>
                  </TableCell>
                  <TableCell className="hidden xl:table-cell">
                    <Badge className="text-xs" variant="secondary">
                      CCKK
                    </Badge>
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">
                    081955891
                  </TableCell>
                  <TableCell className="hidden lg:table-cell">Lead</TableCell>
                  <TableCell>
                    <Badge className="text-xs" variant="secondary">
                      Discovery
                    </Badge>
                  </TableCell>
                  <TableCell className="hidden lg:table-cell">
                    Meta Ad
                  </TableCell>
                  <TableCell className="hidden lg:table-cell">
                    <Image
                      src={"https://robohash.org/mail@ashallendesign.co.uk"}
                      width={36}
                      height={36}
                      alt="Avatar"
                      className="overflow-hidden rounded-full"
                    />
                  </TableCell>
                  <TableCell className="text-right">฿5,000</TableCell>
                </TableRow> */}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
