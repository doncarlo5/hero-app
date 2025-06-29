import { useEffect, useState } from "react";
import fetchApi from "../lib/api-handler";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/table";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Label } from "../components/ui/label";

interface ExerciseType {
  _id: string;
  name: string;
  type_session: string[];
}

function UsersPage() {
  const [types, setTypes] = useState<ExerciseType[]>([]);
  const [editName, setEditName] = useState<Record<string, string>>({});

  useEffect(() => {
    fetchApi("/exercise-type")
      .then(setTypes)
      .catch((e) => console.error(e));
  }, []);

  const handleUpdate = async (id: string) => {
    try {
      const updated = await fetchApi(`/exercise-type/${id}`, {
        method: "PUT",
        body: JSON.stringify({ name: editName[id] }),
      });
      setTypes((t) => t.map((et) => (et._id === id ? { ...et, ...updated } : et)));
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Exercise Types</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Type Session</TableHead>
            <TableHead>Update</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {types.map((t) => (
            <TableRow key={t._id}>
              <TableCell>{t.name}</TableCell>
              <TableCell>{t.type_session.join(", ")}</TableCell>
              <TableCell className="flex gap-2">
                <Label className="sr-only" htmlFor={`name-${t._id}`}>Name</Label>
                <Input
                  id={`name-${t._id}`}
                  value={editName[t._id] ?? ""}
                  onChange={(e) =>
                    setEditName({ ...editName, [t._id]: e.target.value })
                  }
                />
                <Button onClick={() => handleUpdate(t._id)}>Save</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default UsersPage;
