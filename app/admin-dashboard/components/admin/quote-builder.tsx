"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Plus, Trash2, Calculator } from "lucide-react"

interface QuoteItem {
  id: string
  name: string
  price: number
  quantity: number
  total: number
}

export function QuoteBuilder() {
  const [quoteData, setQuoteData] = useState({
    customerName: "",
    customerEmail: "",
    customerPhone: "",
    validUntil: "",
    notes: "",
    paymentTerms: "",
    deliveryTerms: "",
  })

  const [items, setItems] = useState<QuoteItem[]>([])
  const [selectedProduct, setSelectedProduct] = useState("")
  const [quantity, setQuantity] = useState(1)

  // Mock products data
  const products = [
    { id: "1", name: "Solar Battery 12V 100Ah", price: 299.99 },
    { id: "2", name: "DC Ceiling Fan 48V", price: 149.99 },
    { id: "3", name: "MPPT Controller 60A", price: 199.99 },
    { id: "4", name: "Solar Panel 300W", price: 249.99 },
  ]

  const addItem = () => {
    const product = products.find((p) => p.id === selectedProduct)
    if (product) {
      const newItem: QuoteItem = {
        id: Date.now().toString(),
        name: product.name,
        price: product.price,
        quantity,
        total: product.price * quantity,
      }
      setItems([...items, newItem])
      setSelectedProduct("")
      setQuantity(1)
    }
  }

  const removeItem = (id: string) => {
    setItems(items.filter((item) => item.id !== id))
  }

  const updateQuantity = (id: string, newQuantity: number) => {
    setItems(
      items.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity, total: item.price * newQuantity } : item,
      ),
    )
  }

  const subtotal = items.reduce((sum, item) => sum + item.total, 0)
  const tax = subtotal * 0.1 // 10% tax
  const total = subtotal + tax

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Customer Information</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="customerName">Customer Name</Label>
            <Input
              id="customerName"
              value={quoteData.customerName}
              onChange={(e) => setQuoteData({ ...quoteData, customerName: e.target.value })}
            />
          </div>
          <div>
            <Label htmlFor="customerEmail">Email</Label>
            <Input
              id="customerEmail"
              type="email"
              value={quoteData.customerEmail}
              onChange={(e) => setQuoteData({ ...quoteData, customerEmail: e.target.value })}
            />
          </div>
          <div>
            <Label htmlFor="customerPhone">Phone</Label>
            <Input
              id="customerPhone"
              value={quoteData.customerPhone}
              onChange={(e) => setQuoteData({ ...quoteData, customerPhone: e.target.value })}
            />
          </div>
          <div>
            <Label htmlFor="validUntil">Valid Until</Label>
            <Input
              id="validUntil"
              type="date"
              value={quoteData.validUntil}
              onChange={(e) => setQuoteData({ ...quoteData, validUntil: e.target.value })}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Add Items</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 items-end">
            <div className="flex-1">
              <Label>Product</Label>
              <Select value={selectedProduct} onValueChange={setSelectedProduct}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a product" />
                </SelectTrigger>
                <SelectContent>
                  {products.map((product) => (
                    <SelectItem key={product.id} value={product.id}>
                      {product.name} - ${product.price}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Quantity</Label>
              <Input
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(Number.parseInt(e.target.value) || 1)}
                className="w-20"
              />
            </div>
            <Button onClick={addItem} disabled={!selectedProduct}>
              <Plus className="h-4 w-4 mr-2" />
              Add
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Quote Items</CardTitle>
        </CardHeader>
        <CardContent>
          {items.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">
              No items added yet. Add some products to get started.
            </p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead>Total</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {items.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>${item.price.toFixed(2)}</TableCell>
                    <TableCell>
                      <Input
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(e) => updateQuantity(item.id, Number.parseInt(e.target.value) || 1)}
                        className="w-20"
                      />
                    </TableCell>
                    <TableCell>${item.total.toFixed(2)}</TableCell>
                    <TableCell>
                      <Button variant="ghost" size="sm" onClick={() => removeItem(item.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}

          {items.length > 0 && (
            <div className="mt-6 space-y-2 text-right">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Tax (10%):</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-lg font-bold">
                <span>Total:</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Terms & Notes</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="paymentTerms">Payment Terms</Label>
            <Textarea
              id="paymentTerms"
              value={quoteData.paymentTerms}
              onChange={(e) => setQuoteData({ ...quoteData, paymentTerms: e.target.value })}
              placeholder="e.g., 50% upfront, 50% on delivery"
            />
          </div>
          <div>
            <Label htmlFor="deliveryTerms">Delivery Terms</Label>
            <Textarea
              id="deliveryTerms"
              value={quoteData.deliveryTerms}
              onChange={(e) => setQuoteData({ ...quoteData, deliveryTerms: e.target.value })}
              placeholder="e.g., 2-3 weeks delivery, installation included"
            />
          </div>
          <div>
            <Label htmlFor="notes">Additional Notes</Label>
            <Textarea
              id="notes"
              value={quoteData.notes}
              onChange={(e) => setQuoteData({ ...quoteData, notes: e.target.value })}
              placeholder="Any additional information or special conditions"
            />
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end gap-4">
        <Button variant="outline">Save Draft</Button>
        <Button>
          <Calculator className="h-4 w-4 mr-2" />
          Generate Quote
        </Button>
      </div>
    </div>
  )
}
