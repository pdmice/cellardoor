import { prisma } from "./prisma";
import { Cart, Prisma } from "@prisma/client";
import { cookies } from "next/dist/client/components/headers";

export type CartWithProducts = Prisma.CartGetPayload<{
  include: { items: { include: { product: true } } };
}>;

export type ShoppingCart = CartWithProducts & {
  size: number;
  subtotal: number;
};

export type CartItemWithProduct = Prisma.CartItemGetPayload<{
  include: { product: true };
}>;

export async function getCart(): Promise<ShoppingCart | null> {
  const localCartId = cookies().get("localCartId")?.value;
  const cart = localCartId
    ? await prisma.cart.findUnique({
        where: { id: localCartId },
        include: { items: { include: { product: true } } },
      })
    : null;

  if (!cart) {
    return null;
  }
  return {
    ...cart,
    size: cart.items.reduce((acc, item) => acc + item.quantity, 0),
    subtotal: cart.items.reduce(
      (acc, items) => acc + items.quantity * items.product.price,
      0,
    ),
  };
}

export async function createCart(): Promise<ShoppingCart> {
  const newCart = await prisma.cart.create({
    data: {},
  });
  //Fix this to encrypt the cartId + secure the cookie
  cookies().set("localCartId", newCart.id);
  return {
    ...newCart,
    items: [],
    size: 0,
    subtotal: 0,
  };
}
