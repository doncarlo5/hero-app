import { useEffect, useState } from "react";
import fetchApi from "../lib/api-handler";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/table";
import { Button } from "../components/ui/button";

interface Session {
  _id: string;
  date_session: string;
  type_session: string;
  is_done: boolean;
}

function SessionsPage() {
  const [sessions, setSessions] = useState<Session[]>([]);

  useEffect(() => {
    fetchApi("/sessions")
      .then(setSessions)
      .catch((e) => console.error(e));
  }, []);

  const toggleDone = async (id: string, isDone: boolean) => {
    try {
      const updated = await fetchApi(`/sessions/${id}`, {
        method: "PUT",
        body: JSON.stringify({ is_done: !isDone }),
      });
      setSessions((s) => s.map((ss) => (ss._id === id ? { ...ss, ...updated } : ss)));
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Sessions</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Done</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sessions.map((s) => (
            <TableRow key={s._id}>
              <TableCell>{new Date(s.date_session).toLocaleDateString()}</TableCell>
              <TableCell>{s.type_session}</TableCell>
              <TableCell>
                <Button variant="secondary" onClick={() => toggleDone(s._id, s.is_done)}>
                  {s.is_done ? "Mark Undone" : "Mark Done"}
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default SessionsPage;
