const Agent = require('../src/agent/agent');

describe('Agent', () => {
  let agent;

  beforeEach(() => {
    agent = new Agent('TestAgent');
  });

  it('should initialize with a name and ID', () => {
    expect(agent.name).toBe('TestAgent');
    expect(typeof agent.id).toBe('string');
    expect(agent.id.length).toBeGreaterThan(0);
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
    expect(agent.tools).toHaveProperty(toolName);
    expect(agent.tools[toolName]).toBe(toolFunction);
  });

  it('should use a tool', async () => {
    const toolName = 'testTool';
    const toolFunction = () => 'Tool result';
    agent.addTool(toolName, toolFunction);
    const result = await agent.useTool(toolName, 'input');
    expect(result).toBe('Tool result');
  });

  it('should handle tool not found error', async () => {
    await expect(agent.useTool('nonExistentTool', 'input')).rejects.toThrowError('Tool nonExistentTool not found');
  });
});