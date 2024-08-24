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
import { ListFilter, File } from "lucide-react";
import Image from "next/image";
import { api } from "~/trpc/react";
import type { User } from "next-auth";

interface CustomerTable {
  user: User | undefined;
}

export function CustomerTable({ user }: CustomerTable) {
  const {
    data: teamNames,
    error,
    isLoading,
  } = api.user.getTeam.useQuery(
    {
      userId: user?.id,
    },
    { enabled: !!user?.id },
  );

  console.log("1", teamNames);
  console.log("2", error);
  console.log("3", isLoading);
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
            <CardTitle>Leads</CardTitle>
            <CardDescription>Recent orders from your store.</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader className="sticky top-[98px] bg-background/80 backdrop-blur-md">
                <TableRow>
                  <TableHead>Customer</TableHead>
                  <TableHead className="hidden xl:table-cell">
                    Company
                  </TableHead>
                  <TableHead className="hidden sm:table-cell">Phone</TableHead>
                  <TableHead className="hidden lg:table-cell">Type</TableHead>
                  <TableHead>Stage</TableHead>
                  <TableHead className="hidden lg:table-cell">
                    Service
                  </TableHead>
                  <TableHead className="hidden lg:table-cell">Owner</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {/* {deals.map((deal, index) => {
                  return (
                    <Sheet key={index}>
                      <SheetTrigger asChild>
                        <TableRow className="hover:cursor-pointer">
                          <TableCell>
                            <div className="font-medium">
                              {deal.name ?? "-"}
                            </div>
                            <div className="hidden text-sm text-muted-foreground md:block">
                              {deal.email ?? "-"}
                            </div>
                          </TableCell>
                          <TableCell className="hidden xl:table-cell">
                            <Badge className="text-xs" variant="secondary">
                              {deal.company ?? "-"}
                            </Badge>
                          </TableCell>
                          <TableCell className="hidden sm:table-cell">
                            {deal.phone ?? "-"}
                          </TableCell>
                          <TableCell className="hidden lg:table-cell">
                            {deal.typeName ?? "-"}
                          </TableCell>
                          <TableCell>
                            <Badge className="text-xs" variant="secondary">
                              {deal.stageName ?? "-"}
                            </Badge>
                          </TableCell>
                          <TableCell className="hidden lg:table-cell">
                            {deal.serviceName ?? "-"}
                          </TableCell>
                          <TableCell className="hidden lg:table-cell">
                            {deal.userImage ? (
                              <Image
                                src={
                                  deal.userImage ??
                                  "https://robohash.org/mail@ashallendesign.co.uk"
                                }
                                width={36}
                                height={36}
                                alt="Avatar"
                                className="overflow-hidden rounded-full"
                              />
                            ) : (
                              "-"
                            )}
                          </TableCell>
                          <TableCell className="text-right">฿5,000</TableCell>
                        </TableRow>
                      </SheetTrigger>
                      <SheetContent>
                        <SheetHeader>
                          <SheetTitle>Edit profile</SheetTitle>
                          <SheetDescription>
                            Make changes to your profile here. Click save when
                            you're done.
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
                            <Label htmlFor="username" className="text-right">
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
                })} */}
                <TableRow className="bg-accent">
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
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
