import prisma from "@/db/prisma";

const sampleTodo = [
  {
    title: "Complete project proposal",
    details: "Finish the Q1 project proposal and send to manager",
    isCompleted: false,
    deadline: "2026-01-25T17:00:00Z",
  },
  {
    title: "Buy groceries",
    details: "Milk, eggs, bread, and vegetables from the market",
    isCompleted: false,
    deadline: "2026-01-20T18:00:00Z",
  },
  {
    title: "Fix bug in payment module",
    details: "Resolve the currency conversion issue affecting USD transactions",
    isCompleted: false,
    deadline: "2026-01-22T09:00:00Z",
  },
  {
    title: "Team meeting notes",
    details: "Document and share notes from Monday's sprint planning meeting",
    isCompleted: false,
    deadline: null,
  },
  {
    title: "Update documentation",
    details:
      "Add API endpoint examples to the README and update quick start guide",
    isCompleted: false,
    deadline: "2026-01-28T15:30:00Z",
  },
];

const seedTodos = async () => {
  for (const [index, vlaue] of sampleTodo.entries()) {
    await prisma.todo.create({ data: vlaue });
    console.log("created ****  ", index, " --- ", vlaue);
  }
};

seedTodos();
