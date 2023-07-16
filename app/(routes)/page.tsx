import getBillboard from "@/actions/getBillboard";
import getProducts from "@/actions/getProducts";
import { ProductList } from "@/components/productList";
import { Billboard } from "@/components/ui/billboard"
import Container from "@/components/ui/container"

export const revalidate = 0;

const HomePage = async () => {
const products = await getProducts({ isFeatured: true })
const billboard = await getBillboard("91988b3d-71a9-408a-88d1-cc6c8d6bb52e");

  return (
    <Container>
      <div className="space-y-10 pb-10">
        <Billboard data={billboard} />

        <div className="flex flex-col gap-y-8 px-4 sm:px-6 lg:px-8">
          <ProductList title="Featured Products" items={products} />
        </div>
      </div>
    </Container>
  );
}

export default HomePage