import express, { Request, Response } from "express";
import { renderToPipeableStream } from "react-dom/server";

import React from "react";
import { readdirSync } from "fs";
import { join } from "path";

const app = express();
const port = 4000;

app.use(express.static("dist"));

const pages = readdirSync(join(process.cwd(), "src/pages")).map(
  (file) => file.split(".")[0]
);

pages.forEach((page) => {
  app.get(`/${page}`, async (req: Request, res: Response) => {
    try {
      const mod = await import(`./pages/${page}`);
      const Component = mod.default;
      let props = {};
      if (mod.gSSP) {
        props = await mod.gSSP(req);
      }

      const { pipe } = renderToPipeableStream(<Component {...props} />, {});
      pipe(res);
    } catch (e) {
      console.log(e);
    }
  });
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
