import { Remult } from "remult";
import { createKnexDataProvider } from "remult/remult-knex";
import { Task } from "./Task";

(async () => {
  // const db = {
  //   client: "pg",
  //   connection: "postgres://postgres:postgres@localhost:5432/remult-test",
  // };
  const db = {
    client: "mysql2",
    connection: {
      host: "localhost",
      user: "root",
      password: "",
      database: "remult-test",
    },
  };
  const dataProvider = await createKnexDataProvider(db, true);
  const remult = new Remult(dataProvider);
  const taskRepo = remult.repo(Task);

  try {
    // create
    let task = await taskRepo.insert({ title: "Test Task" });
    console.log("CREATE", task);
  } catch (err) {
    console.error(err);
  }

  try {
    // select
    let result: any = await taskRepo.find();
    console.log("SELECT", result);
  } catch (err) {
    console.error(err);
  }

  try {
    // update
    let task = await taskRepo.update(1, { title: "Test Update" });
    console.log("UPDATE", task);
  } catch (err) {
    console.error(err);
  }

  try {
    // delete
    // await taskRepo.delete(1);
  } catch (err) {
    console.error(err);
  }
})();
