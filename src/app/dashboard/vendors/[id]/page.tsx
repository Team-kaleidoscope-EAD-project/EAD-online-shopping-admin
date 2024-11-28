import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Page({ params }: { params: { id: number } }) {
  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Details</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <h3 className="font-medium">ID</h3>
            <p>{params.id}</p>
          </div>
          <div className="mb-4">
            <h3 className="font-medium">Name</h3>
            <p>Foo Bar</p>
          </div>
          <div className="mb-4">
            <h3 className="font-medium">Organization</h3>
            <p>John Deer Inc.</p>
          </div>
          <div className="mb-4">
            <h3 className="font-medium">Email</h3>
            <p>john@deer.com</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
