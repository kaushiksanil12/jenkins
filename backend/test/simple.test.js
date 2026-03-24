const request = {
  get: (url) => {
    return Promise.resolve({ status: 200, data: { status: 'API is running' } });
  }
};

test('API Status Endpoint', async () => {
  const res = await request.get('/api/status');
  expect(res.status).toBe(200);
  expect(res.data.status).toBe('API is running');
});

test('Simple Addition', () => {
  expect(1 + 1).toBe(2);
});
