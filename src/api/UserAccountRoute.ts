// import { Router, Request, Response } from "express";
// import { userAccountController } from "../controller/TestController";

// class UserAccountRoutes {
//   private router: Router = Router();

//   constructor() {
//     this.initRoutes();
//   }

//   public getRoutes() {
//     return this.router;
//   }

//   private initRoutes(): void {
//     this.router.post("/create-user", async (req: Request, res: Response) => {
//       userAccountController.addNewUser(req, res);
//     });

//     this.router.get("/testGet", async (req: Request, res: Response) => {
//       await userAccountController.getAllUsers(req, res);
//     });
//   }
// }

// export const userAccountRoutes = new UserAccountRoutes().getRoutes();
