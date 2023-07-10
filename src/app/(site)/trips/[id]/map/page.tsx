import dynamic from "next/dynamic";

const DynamicMap = dynamic(() => import("../../components/map"), {
  ssr: false,
});
function MapPage({ params }: { params: { id: string } }) {
  return (
    <div className="max-w-3xl w-full h-[748px] mt-4 m-2 rounded-md overflow-hidden ">
      <DynamicMap tripId={params.id} />
    </div>
  );
}
export default MapPage;
