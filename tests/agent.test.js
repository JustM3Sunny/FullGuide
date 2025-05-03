const Agent = require('../src/agent/agent');

describe('Agent', () => {
  let agent;

  beforeEach(() => {
    agent = new Agent('TestAgent');
  });

  it('should initialize with a name and ID', () => {
    expect(agent.name).toBe('TestAgent');
    expect(typeof agent.id).toBe('string'); // More specific ID check
    expect(agent.id.length).toBeGreaterThan(0); // Ensure ID is not empty
  });

  it('should process input and return a response', async () => {
    const input = 'Hello, Agent!';
    const response = await agent.processInput(input);
    expect(response).toContain('Processing input');
  });

  it('should add a tool', () => {
    const toolName = 'testTool';
    const toolFunction = () => 'Tool result';
    agent.addTool(toolName, toolFunction);
    expect(agent.tools).toHaveProperty(toolName); // More robust check
    expect(agent.tools[toolName]).toBe(toolFunction); // Verify the function is stored correctly
  });

  it('should use a tool', async () => {
    const toolName = 'testTool';
    const toolFunction = () => 'Tool result';
    agent.addTool(toolName, toolFunction);
    const result = await agent.useTool(toolName, 'input');
    expect(result).toBe('Tool result');
  });

  it('should handle tool not found error', async () => {
    try {
      await agent.useTool('nonExistentTool', 'input');
    } catch (error) {
      expect(error.message).toContain('Tool nonExistentTool not found');
      return; // Exit the test if the error is caught
    }
    fail('Expected an error to be thrown'); // Fail if no error is thrown
  });
});