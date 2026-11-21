import { useCartStore } from "@/stores/cartStore";
import { useUiStore } from "@/stores/uiStore";
import { Drawer } from "@/components/ui/Drawer";
import { Button } from "@/components/ui/Button";
import { QuantitySelector } from "@/components/ui/QuantitySelector";
import { Trash2, ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";

export default function CartDrawer() {
  const open = useUiStore((s) => s.cartOpen);
  const setOpen = useUiStore((s) => s.setCartOpen);
  const items = useCartStore((s) => s.items);
  const removeItem = useCartStore((s) => s.removeItem);
  const setQuantity = useCartStore((s) => s.setQuantity);
  const clear = useCartStore((s) => s.clear);
  const subtotal = useCartStore((s) => s.subtotal());
  const count = useCartStore((s) => s.count());

  return (
    <Drawer open={open} onOpenChange={setOpen} side="right">
      <div className="flex h-full flex-col">
        <div className="border-b border-border px-6 py-5 pr-12">
          <h2 className="text-lg font-semibold">Your Cart ({count})</h2>
        </div>
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {items.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center gap-3 text-center text-ink-soft">
              <ShoppingBag className="h-10 w-10" />
              <p>Your cart is empty.</p>
            </div>
          ) : (
            <ul className="space-y-4">
              {items.map((item) => (
                <li key={item.product.id} className="flex gap-4">
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    className="h-20 w-20 rounded-xl object-cover"
                    loading="lazy"
                  />
                  <div className="flex-1">
                    <p className="font-medium">{item.product.name}</p>
                    <p className="text-sm text-ink-soft">${item.product.price}</p>
                    <div className="mt-2 flex items-center justify-between">
                      <QuantitySelector
                        value={item.quantity}
                        onChange={(v) => setQuantity(item.product.id, v)}
                      />
                      <button
                        onClick={() => removeItem(item.product.id)}
                        className="text-ink-soft hover:text-primary"
                        aria-label="Remove item"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
        {items.length > 0 && (
          <div className="border-t border-border px-6 py-5 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-ink-soft">Subtotal</span>
              <span className="text-lg font-semibold">${subtotal.toFixed(2)}</span>
            </div>
            <p className="text-xs text-ink-soft">Shipping and taxes calculated at checkout. (Mock — no real order.)</p>
            <Link to="/checkout" onClick={() => setOpen(false)}>
              <Button className="w-full">Checkout</Button>
            </Link>
            <Button variant="ghost" className="w-full" onClick={clear}>
              Clear cart
            </Button>
          </div>
        )}
      </div>
    </Drawer>
  );
}
