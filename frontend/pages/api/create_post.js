import { post } from "../../utils/auth";

const handler = async (req, res) => {
  const body = req.body;

  const ticket = await post("/api/tickets", body);

  const success = ticket.data != null;

  if (success) {
    res.status(200).send(ticket.data);
    return;
  }

  res.status(200).send(ticket.error);
};

export default handler;
