with open("src/config.ts", "r") as f:
    text = f.read()

text = text.replace("""  customPages: [
    { text: "Fake", link: "/fake", key: "fake" }
  ] as any[],
    // Example: { text: 'Alumni', link: '/alumni', key: 'alumni' }
  ],""", """  customPages: [] as any[],""")

with open("src/config.ts", "w") as f:
    f.write(text)
