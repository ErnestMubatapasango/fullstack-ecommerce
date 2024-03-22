import { getGraphRevenue } from "@/app/actions/get-graph-revenue"
import { getTotalRevenue } from "@/app/actions/get-revenue-total"
import { getSalesCount } from "@/app/actions/get-sales-count"
import { getStockCount } from "@/app/actions/get-stock-count"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Heading from "@/components/ui/heading"
import Overview from "@/components/ui/overview"
import { Separator } from "@/components/ui/separator"
import prismadb from "@/lib/prismadb"
import { formatter } from "@/lib/utils"
import { CreditCard, DollarSign, Package } from "lucide-react"
import React from 'react'


interface DashbaordPageProps {
    params: {storeId : string}
}

const DashboardPage: React.FC<DashbaordPageProps> = async({params}) => {

    const store = await prismadb.store.findFirst({
        where: {
            id: params.storeId
        }
    })

    const totalRevenue = await getTotalRevenue(params.storeId)
    const salesCount = await getSalesCount(params.storeId)
    const stockCount = await getStockCount(params.storeId)
    const graphRevenue = await getGraphRevenue(params.storeId)

  return (
    <div className="flex-col">
        <div className="flex-1 space-y-4 p-8 pt-6">
            <Heading title="Dashboard" description="Overview of your store" />
            <Separator />
            <div className="grid grid-cols-3 gap-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                        <CardTitle>
                            Total Revenue
                        </CardTitle>
                        <DollarSign className="h-8 w-8 text-muted-foreground" />
                    </CardHeader>
                    <CardContent className="text-2xl font-bold">
                        {formatter.format(totalRevenue)}
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                        <CardTitle>
                            Sales
                        </CardTitle>
                        <CreditCard className="h-8 w-8 text-muted-foreground" />
                    </CardHeader>
                    <CardContent className="text-2xl font-bold">
                        +{salesCount}
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                        <CardTitle>
                            Products in Stock
                        </CardTitle>
                        <Package className="h-8 w-8 text-muted-foreground" />
                    </CardHeader>
                    <CardContent className="text-2xl font-bold">
                        {stockCount}
                    </CardContent>
                </Card>
            </div>
            <Card className="col-span-4">
                <CardHeader>
                    <CardTitle>Overview</CardTitle>
                </CardHeader>
                <CardContent className="pl-2">
                    <Overview data={graphRevenue} />
                </CardContent>
            </Card>
        </div>
        Active Store: {store?.name}
    </div>
  )
}

export default DashboardPage

