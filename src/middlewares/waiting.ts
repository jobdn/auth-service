// @ts-ignore
export async function waiting(req, res, next) {
  await new Promise<void>((res) => {
    setTimeout(() => {
      res();
    }, 2000);
  });
  next();
}
