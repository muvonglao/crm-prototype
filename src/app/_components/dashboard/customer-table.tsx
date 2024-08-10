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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { Button } from "~/components/ui/button";
import { Badge } from "~/components/ui/badge";
import { ListFilter, File } from "lucide-react";
import { auth } from "~/server/auth";
import Image from "next/image";
import { api } from "~/trpc/server";

export async function CustomerTable() {
  const session = await auth();
  const leads = await api.leads.getLeads();
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
            <CardTitle>Orders</CardTitle>
            <CardDescription>Recent orders from your store.</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader className="sticky top-[98px] bg-card">
                <TableRow>
                  <TableHead>Customer</TableHead>
                  <TableHead className="hidden md:table-cell">Phone</TableHead>
                  <TableHead className="hidden sm:table-cell">Type</TableHead>
                  <TableHead className="hidden sm:table-cell">Stage</TableHead>
                  <TableHead className="hidden sm:table-cell">
                    Service
                  </TableHead>
                  <TableHead className="hidden lg:table-cell">Owner</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {leads.map((lead, index) => {
                  return (
                    <TableRow key={index}>
                      <TableCell>
                        <div className="font-medium">{lead.name}</div>
                        <div className="hidden text-sm text-muted-foreground md:inline">
                          {lead.email}
                        </div>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        {lead.phone}
                      </TableCell>
                      <TableCell className="hidden sm:table-cell">
                        {lead.typeName}
                      </TableCell>
                      <TableCell className="hidden sm:table-cell">
                        <Badge className="text-xs" variant="secondary">
                          {lead.stageName}
                        </Badge>
                      </TableCell>
                      <TableCell className="hidden sm:table-cell">
                        {lead.serviceName}
                      </TableCell>
                      <TableCell className="hidden lg:table-cell">
                        <Image
                          src={
                            lead.userImage ??
                            "https://robohash.org/mail@ashallendesign.co.uk"
                          }
                          width={36}
                          height={36}
                          alt="Avatar"
                          className="overflow-hidden rounded-full"
                        />
                      </TableCell>
                      <TableCell className="text-right">฿5,000</TableCell>
                    </TableRow>
                  );
                })}
                <TableRow className="bg-accent">
                  <TableCell>
                    <div className="font-medium">Liam Johnson</div>
                    <div className="hidden text-sm text-muted-foreground md:inline">
                      liam@example.com
                    </div>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    081955891
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">Lead</TableCell>
                  <TableCell className="hidden sm:table-cell">
                    <Badge className="text-xs" variant="secondary">
                      Discovery
                    </Badge>
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">
                    Meta Ad
                  </TableCell>
                  <TableCell className="hidden lg:table-cell">
                    <Image
                      src={
                        session?.user?.image ??
                        "https://robohash.org/mail@ashallendesign.co.uk"
                      }
                      width={36}
                      height={36}
                      alt="Avatar"
                      className="overflow-hidden rounded-full"
                    />
                  </TableCell>
                  <TableCell className="text-right">฿5,000</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <div className="font-medium">Liam Johnson</div>
                    <div className="hidden text-sm text-muted-foreground md:inline">
                      liam@example.com
                    </div>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    081955891
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">Lead</TableCell>
                  <TableCell className="hidden sm:table-cell">
                    <Badge className="text-xs" variant="secondary">
                      Discovery
                    </Badge>
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">
                    Meta Ad
                  </TableCell>
                  <TableCell className="hidden lg:table-cell">
                    <Image
                      src={
                        session?.user?.image ??
                        "https://robohash.org/mail@ashallendesign.co.uk"
                      }
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
