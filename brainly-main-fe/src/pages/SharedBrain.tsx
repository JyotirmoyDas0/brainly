import { useParams } from "react-router-dom";
import axios from "axios";
import { Card } from "../components/Card";
import { useQuery } from "@tanstack/react-query";

export function SharedBrain() {
  const { shareLink } = useParams();

  const { data, isPending } = useQuery({
    queryKey: ["content", shareLink],
    queryFn: async () => {
      const res = await axios.get(
        `http://localhost:3000/api/v1/brain/${shareLink}`,
      );
      return res.data;
    },
    enabled: !!shareLink,
  });

  if (isPending) {
    return (
      <div className="h-screen flex items-center justify-center text-gray-500 text-lg">
        Loading shared brain...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-white shadow-sm border-b px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-semibold">{data.username}'s Brain</h1>
        <span className="text-sm text-gray-500">Shared Collection</span>
      </div>

      <div className="p-6 max-w-6xl mx-auto">
        {data.content.length === 0 ? (
          <div className="text-center text-gray-500 mt-20">
            <p className="text-lg">No content shared yet </p>
          </div>
        ) : (
          <div className="flex flex-wrap gap-6 justify-center">
            {data.content.length === 0 ? (
              <p>No Content Shared</p>
            ) : (
              data.content.map((item) => (
                <Card
                  id={item.id}
                  key={item.id}
                  type={item.type}
                  link={item.link}
                  title={item.title}
                  description={item.description}
                  tags={item.tags}
                />
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}
