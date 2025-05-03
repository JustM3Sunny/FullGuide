const Agent = require('../src/agent/agent');

describe('Agent', () => {
  let agent;

  beforeEach(() => {
    agent = new Agent('TestAgent');
  });

  it('should initialize with a name and ID', () => {
    expect(agent.name).toBe('TestAgent');
    expect(agent.id).toBeDefined();
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
    expect(agent.tools[toolName]).toBeDefined();
  });

  it('should use a tool', async () => {
    const toolName = 'testTool';
    const toolFunction = () => 'Tool result';
    agent.addTool(toolName, toolFunction);
    const result = await agent.useTool(toolName, 'input');
    expect(result).toBe('Tool result');
  });

  it('should handle tool not found error', async () => {
    const result = await agent.useTool('nonExistentTool', 'input');
    expect(result).toContain('Tool nonExistentTool not found');
  });
});