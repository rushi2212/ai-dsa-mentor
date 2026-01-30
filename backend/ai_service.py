# same as previous version – generate_lesson, generate_mcqs, answer_doubt
# (using Groq client)
from groq import Groq
import os
import json

client = Groq(api_key=os.getenv("GROQ_API_KEY"))


def generate_lesson(topic: str) -> str:
    """Generate a comprehensive Java DSA lesson for a given topic."""
    try:
        response = client.chat.completions.create(
            model="llama-3.1-8b-instant",
            messages=[
                {
                    "role": "system",
                    "content": "You are an expert Java and Data Structures & Algorithms tutor. Create comprehensive, professional, and beginner-friendly lessons. Always use Java code examples. Format output with clear sections using markdown."
                },
                {
                    "role": "user",
                    "content": f"""Create a detailed, professional lesson on '{topic}' focusing on Java implementation. Include these sections using markdown headers:

1. Overview - Clear explanation of the concept
2. Key Concepts - Main principles and ideas
3. Java Implementation - How to implement in Java with built-in classes
4. Code Example - Complete, runnable Java code with detailed comments
5. Time and Space Complexity - Big O analysis
6. Real-World Use Cases - Practical applications
7. Common Pitfalls - What to avoid when coding
8. Study Tips - How to master this topic

Make it engaging, professional, and suitable for intermediate Java developers. Use proper markdown formatting with code blocks for Java code."""
                }
            ],
            temperature=0.7,
            max_tokens=2000,
        )
        return response.choices[0].message.content
    except Exception as e:
        return f"Error generating lesson: {str(e)}"


def generate_mcqs(topic: str, count: int = 10) -> list:
    """Generate Java-focused multiple-choice questions for a topic."""
    try:
        response = client.chat.completions.create(
            model="llama-3.1-8b-instant",
            messages=[
                {
                    "role": "system",
                    "content": "You are an expert Java and DSA quiz creator. Generate ONLY valid JSON with no additional text or explanation."
                },
                {
                    "role": "user",
                    "content": f"""Create a JSON array with exactly {count} multiple-choice questions about '{topic}'.

IMPORTANT: Return ONLY valid JSON, nothing else. No markdown, no explanations.

Format exactly like this (must be valid JSON):
[
  {{
    "question": "What does this do?",
    "options": ["Option A", "Option B", "Option C", "Option D"],
    "correct": "A",
    "explanation": "This is correct because..."
  }}
]

Requirements:
- "question": Clear question about {topic} in Java
- "options": Exactly 4 options as strings
- "correct": One letter: A, B, C, or D
- "explanation": Why the correct answer is right

Create {count} questions now. Return ONLY the JSON array, nothing else."""
                }
            ],
            temperature=0.5,
            max_tokens=3000,
        )
        content = response.choices[0].message.content.strip()

        # Try to extract JSON if wrapped in markdown code blocks
        if "```" in content:
            content = content.split("```")[1]
            if content.startswith("json"):
                content = content[4:]
            content = content.strip()

        # Clean up content - remove any leading/trailing text
        
        if content.startswith("["):
            end_idx = content.rfind("]")
            if end_idx != -1:
                content = content[:end_idx + 1]

        # Try to parse JSON
        try:
            mcqs = json.loads(content)
            # Validate structure
            if isinstance(mcqs, list) and len(mcqs) > 0:
                validated_mcqs = []
                for mcq in mcqs:
                    if all(key in mcq for key in ["question", "options", "correct", "explanation"]):
                        if len(mcq["options"]) == 4 and mcq["correct"] in ["A", "B", "C", "D"]:
                            validated_mcqs.append(mcq)

                if validated_mcqs:
                    return validated_mcqs
        except json.JSONDecodeError:
            pass

        # Fallback: return sample MCQs if parsing fails
        return [
            {
                "question": f"What is a key feature of {topic}?",
                "options": ["Efficient performance", "Easy to understand", "Widely used", "All of the above"],
                "correct": "D",
                "explanation": f"All of these are important characteristics of {topic}. It provides efficient performance, is relatively straightforward to understand, and is widely used in real-world applications."
            },
            {
                "question": f"How would you implement {topic} in Java?",
                "options": ["Using arrays", "Using linked lists", "Using hash tables", "Depends on the use case"],
                "correct": "D",
                "explanation": f"The implementation of {topic} depends on your specific use case. Different data structures offer different trade-offs in terms of performance and memory usage."
            },
            {
                "question": f"What is the time complexity of {topic} operations?",
                "options": ["O(1)", "O(n)", "O(log n)", "Depends on implementation"],
                "correct": "D",
                "explanation": f"The time complexity of {topic} operations varies depending on the specific implementation and which operation you're referring to."
            },
            {
                "question": f"When should you use {topic}?",
                "options": ["Always", "For small datasets", "When you need fast lookups", "Never"],
                "correct": "C",
                "explanation": f"{topic} is most beneficial when you need fast lookups or specific performance characteristics. It's not always the best choice for every scenario."
            },
            {
                "question": f"What is a limitation of {topic}?",
                "options": ["It's too fast", "Memory overhead", "Difficult to implement", "Cannot store data"],
                "correct": "B",
                "explanation": f"Like most data structures, {topic} has memory overhead. The trade-off between time efficiency and space complexity is a key consideration."
            },
            {
                "question": f"How does Java handle {topic}?",
                "options": ["Built-in classes", "Custom implementation only", "Through collections framework", "Both A and C"],
                "correct": "D",
                "explanation": f"Java provides built-in classes for many common implementations of {topic}, and you can also create custom implementations when needed."
            },
            {
                "question": f"What is the best practice for {topic}?",
                "options": ["Always use it", "Never use it", "Choose based on requirements", "Use randomly"],
                "correct": "C",
                "explanation": f"The best practice is to analyze your specific requirements and choose {topic} only when it provides the best performance and fit for your use case."
            },
            {
                "question": f"Can {topic} handle concurrent operations?",
                "options": ["Yes, always", "No, never", "Depends on implementation", "Only in Java 8+"],
                "correct": "C",
                "explanation": f"Whether {topic} can handle concurrent operations depends on the specific implementation. Some implementations are thread-safe while others are not."
            },
            {
                "question": f"What interview question about {topic} is most common?",
                "options": ["How to implement it", "When to use it", "Time complexity", "All of the above"],
                "correct": "D",
                "explanation": f"Interviewers commonly ask about implementation, use cases, and performance characteristics of {topic}. Being prepared for all three is important."
            },
            {
                "question": f"How do you optimize {topic} in Java?",
                "options": ["Use larger data structures", "Reduce memory usage", "Optimize access patterns", "Add more methods"],
                "correct": "C",
                "explanation": f"Optimizing {topic} typically involves analyzing and optimizing access patterns and choosing appropriate data structures based on your specific use case."
            }
        ]

    except Exception as e:
        # Return fallback MCQs on any error
        return [
            {
                "question": "What did you learn today?",
                "options": ["Data structures", "Algorithms", "Java programming", "DSA fundamentals"],
                "correct": "D",
                "explanation": "Great job on completing the lesson! Keep practicing to master these concepts."
            },
            {
                "question": "How will you apply this knowledge?",
                "options": ["In coding interviews", "In real projects", "For competitive programming", "All of the above"],
                "correct": "D",
                "explanation": "These concepts are useful in many areas of software development. Practice and application are key!"
            },
            {
                "question": "What's the next step?",
                "options": ["Learn more topics", "Practice problems", "Review concepts", "All of the above"],
                "correct": "D",
                "explanation": "Continuous learning and practice will help you master DSA. Keep working through lessons and problems!"
            },
            {
                "question": "How confident are you?",
                "options": ["Very confident", "Somewhat confident", "Need more practice", "Will learn more"],
                "correct": "C",
                "explanation": "It's normal to need more practice. Keep going through the lessons and you'll get better!"
            },
            {
                "question": "What's your learning goal?",
                "options": ["Understand concepts", "Pass interviews", "Improve coding skills", "All of the above"],
                "correct": "D",
                "explanation": "Set clear goals for your learning journey. You're on the right track with Java DSA Mentor!"
            }
        ]


def answer_doubt(doubt: str, topic: str = "") -> str:
    """Answer student doubts about DSA topics."""
    try:
        context = f" related to {topic}" if topic else ""
        response = client.chat.completions.create(
            model="llama-3.1-8b-instant",
            messages=[
                {
                    "role": "system",
                    "content": "You are a helpful DSA tutor. Answer student questions clearly and concisely with examples when helpful."
                },
                {
                    "role": "user",
                    "content": f"Student question{context}: {doubt}"
                }
            ],
            temperature=0.7,
            max_tokens=1000,
        )
        return response.choices[0].message.content
    except Exception as e:
        return f"Error answering doubt: {str(e)}"
