import { addRequestSchema } from '../addRequest.schema';

describe('addRequestSchema', () => {
  it('should pass when title and description are both non-empty', () => {
    const result = addRequestSchema.safeParse({
      title: 'แอร์เสีย',
      description: 'แอร์ห้องประชุมไม่เย็น',
    });
    expect(result.success).toBe(true);
  });

  it('should fail when title is empty', () => {
    const result = addRequestSchema.safeParse({ title: '', description: 'มีปัญหา' });
    expect(result.success).toBe(false);
  });

  it('should fail when description is empty', () => {
    const result = addRequestSchema.safeParse({ title: 'แอร์เสีย', description: '' });
    expect(result.success).toBe(false);
  });

  it('should fail when title is only whitespace', () => {
    const result = addRequestSchema.safeParse({ title: '   ', description: 'มีปัญหา' });
    expect(result.success).toBe(false);
  });

  it('should fail when both fields are missing', () => {
    const result = addRequestSchema.safeParse({});
    expect(result.success).toBe(false);
  });
});
