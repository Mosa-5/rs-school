import { buildCsv, downloadCsv } from '../downloadCsv';
import type { CardItem } from '../../components/cardList/cardList';

const items: CardItem[] = [
  { id: 1, title: 'Rick', description: 'Human | Alive' },
  { id: 2, title: 'Morty', description: 'Human, Smith' },
];

describe('buildCsv', () => {
  test('starts with a header row', () => {
    const csv = buildCsv(items);
    expect(csv.split('\n')[0]).toBe('id,name,description,detailsUrl');
  });

  test('includes one row per item with a details URL', () => {
    const lines = buildCsv(items).split('\n');
    expect(lines).toHaveLength(3);
    expect(lines[1]).toContain('Rick');
    expect(lines[1]).toContain(
      'https://rickandmortyapi.com/api/character/1'
    );
  });

  test('escapes values that contain commas', () => {
    expect(buildCsv(items)).toContain('"Human, Smith"');
  });
});

describe('downloadCsv', () => {
  test('creates a blob URL and downloads a file named by item count', () => {
    const createObjectURL = jest.fn(() => 'blob:url');
    const revokeObjectURL = jest.fn();
    globalThis.URL.createObjectURL = createObjectURL;
    globalThis.URL.revokeObjectURL = revokeObjectURL;

    let downloadName = '';
    const clickSpy = jest
      .spyOn(HTMLAnchorElement.prototype, 'click')
      .mockImplementation(function (this: HTMLAnchorElement) {
        downloadName = this.download;
      });

    downloadCsv(items);

    expect(createObjectURL).toHaveBeenCalled();
    expect(clickSpy).toHaveBeenCalled();
    expect(downloadName).toBe('2_items.csv');
    expect(revokeObjectURL).toHaveBeenCalledWith('blob:url');

    clickSpy.mockRestore();
  });
});
