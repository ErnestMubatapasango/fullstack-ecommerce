import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Heading from "@/components/ui/heading"
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
                        <DollarSign className="h-5 w-5 text-muted-foreground" />
                    </CardHeader>
                    <CardContent className="text-2xl font-bold">
                        {formatter.format(100)}
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                        <CardTitle>
                            Sales
                        </CardTitle>
                        <CreditCard className="h-5 w-5 text-muted-foreground" />
                    </CardHeader>
                    <CardContent className="text-2xl font-bold">
                        +25
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                        <CardTitle>
                            Products in Stock
                        </CardTitle>
                        <Package className="h-5 w-5 text-muted-foreground" />
                    </CardHeader>
                    <CardContent className="text-2xl font-bold">
                        50
                    </CardContent>
                </Card>
            </div>
        </div>
        Active Store: {store?.name}
    </div>
  )
}

export default DashboardPage

