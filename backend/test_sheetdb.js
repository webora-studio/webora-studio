const URL = 'https://sheetdb.io/api/v1/qjz6wjc9chxfo';
const data = {
  name: 'Simple Test',
  business_name: 'Simple Corp'
};

async function test() {
  try {
    const response = await fetch(URL, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ data: [data] })
    });
    const result = await response.json();
    console.log('Result:', result);
  } catch (err) {
    console.error('Error:', err);
  }
}

test();
