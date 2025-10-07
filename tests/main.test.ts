import { it, expect, describe } from 'vitest';

describe('group', () => {
    it('should', async () => {
        const res = await fetch('/categories');
        const data = await res.json();
        console.log('data is::', data);
        expect(data).toHaveLength(3);
    })
    
})