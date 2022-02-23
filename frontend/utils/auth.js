import nookies from "nookies";

export const redirectIfLogged = async (ctx) => {
  const cookies = nookies.get(ctx);

  const jwt = cookies.jwt || null;

  if (jwt) {
    return { redirect: { destination: "/", permanent: false } };
  }
  return { props: {} };
};

export const post = async (url, data) => {
  const query = await fetch(`http://localhost:1337${url}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return await query.json();
};
