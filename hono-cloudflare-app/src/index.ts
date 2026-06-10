import { Hono } from 'hono'

const app = new Hono()

app.use(async (c, next) => {
  const auth = c.req.header("Authorization");

  if (!auth) {
    return c.text("You don't have access", 401);
  }

  const [scheme, token] = auth.split(" ");

  if (scheme === "Bearer" && token === "ranDoMauTHheADeR") {
    await next();
    return;
  }

  return c.text("You don't have access", 401);
});

app.post('/', async (c) => {
  const body = await c.req.json()
  console.log(body);
  console.log(c.req.header("Authorization"));
  console.log(c.req.query("param"));

  return c.text('Hello Hono!')
})
export default app
