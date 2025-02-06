import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function generateMicroTasks(
  goal: string,
  category: string,
): Promise<string[]> {
  try {
    // the newest OpenAI model is "gpt-4o" which was released May 13, 2024
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content:
            "You are an AI goal achievement assistant. Generate 3 specific, actionable micro-tasks that will help achieve the given goal. Tasks should be simple, concrete, and completable within a day. Output as a JSON array of task descriptions.",
        },
        {
          role: "user",
          content: `Goal: ${goal}\nCategory: ${category}\n\nGenerate 3 micro-tasks that will help achieve this goal.`,
        },
      ],
      response_format: { type: "json_object" },
    });

    const content = response.choices[0].message.content || '{"tasks": []}';
    const result = JSON.parse(content);
    return result.tasks as string[];
  } catch (error) {
    console.error("Failed to generate tasks:", error);
    return [
      "Break down your goal into smaller steps",
      "Research best practices in this area",
      "Set up a tracking system for your progress",
    ];
  }
}