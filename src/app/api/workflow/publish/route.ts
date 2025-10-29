import { NextResponse } from "next/server";

const workflows: any[] = [];
export async function POST(request: Request) {
  try {
    const body = await request.json();

    const newWorkflow = {
      ...body,
    };

    workflows.push(newWorkflow);

    await new Promise((resolve) => setTimeout(resolve, 3000));

    return new NextResponse(
      JSON.stringify({ message: "Workflow published successfully!" }),
      {
        status: 201,
      }
    );
  } catch (error) {
    console.log("Error saving workflow: ", error);
    return new NextResponse(
      JSON.stringify({ message: "Error saving workflow" }),
      { status: 500 }
    );
  }
}
