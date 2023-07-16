import getBillboard from "@/actions/getBillboard";
import { Billboard } from "@/components/ui/billboard"
import Container from "@/components/ui/container"

export const revalidate = 0;

const HomePage = async () => {

const billboard = await getBillboard("91988b3d-71a9-408a-88d1-cc6c8d6bb52e");

  return (
    <Container>
      <div className="space-y-10 pb-10">
        <Billboard data={billboard} />
      </div>
    </Container>
  );
}

export default HomePage