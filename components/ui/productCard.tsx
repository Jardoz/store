"use client"

import { Expand, ShoppingCart } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { IconButton } from "@/components/ui/iconButton";
import { Currency } from "@/components/ui/currency";

import { Product } from "@/types"
import { MouseEventHandler } from "react";
import usePreviewModal from "@/hooks/usePreviewModal";

interface ProductCardProps {
    product: Product
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
    const router = useRouter()
    const previewModal = usePreviewModal()

    const handleClick = () => {
      
        router.push(`/product/${product?.id}`)
    }

    const onPreview: MouseEventHandler<HTMLButtonElement> = (event) => {
      event.stopPropagation()
      console.log("onPreview");
      
      previewModal.onOpen(product)
    }

  return (
    <div  onClick={handleClick} className="bg-white group cursor-pointer rounded-xl border p-3 space-y-4">
        {/* Images and Actions */}
      <div className="aspect-square rounded-xl bg-bray-100 relative">
        <Image
          src={product?.images?.[0].url}
          alt="Image"
          fill
          className="aspect-square object-cover rounded-md"
        />
        <div className="opacity-0 group-hover:opacity-100 transition absolute w-full px-6 bottom-5">
          <div className="flex gap-x-6 justify-center">
            <IconButton
              onClick={onPreview}
              icon={<Expand size={20} className="text-gray-600" />}
            />
            <IconButton
              onClick={() => {}}
              icon={<ShoppingCart size={20} className="text-gray-600" />}
            />
          </div>
        </div>
      </div>
      {/* Description */}
      <div>
        <p className="font-semibold text-lg">{product.name}</p> 
        <p className="text-sm text-gray-500">{product.category?.name}</p>
      </div>
      {/* Price */}
      <div className="flex items-center justify-between">
        <Currency value={product?.price} />
      </div>
    </div>
  );
};
