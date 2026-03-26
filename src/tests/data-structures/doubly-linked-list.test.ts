import { afterEach, describe, expect, it, vi } from 'vitest';
import { ListaDupla, NoListaDupla } from '@/data-structures/doubly-linked-list';

function buildPlaylist(titles: string[]): ListaDupla {
  const playlist = new ListaDupla();

  for (const title of titles) {
    playlist.insereFim(title);
  }

  return playlist;
}

describe('NoListaDupla', () => {
  it('should initialize info/ant/prox and expose accessors', () => {
    const node = new NoListaDupla('Song A');
    const previous = new NoListaDupla('Song Prev');
    const next = new NoListaDupla('Song Next');

    expect(node.getInfo()).toBe('Song A');
    expect(node.getAnt()).toBeNull();
    expect(node.getProx()).toBeNull();

    node.setInfo('Song B');
    node.setAnt(previous);
    node.setProx(next);

    expect(node.getInfo()).toBe('Song B');
    expect(node.getAnt()).toBe(previous);
    expect(node.getProx()).toBe(next);
    expect(node.toString()).toBe('Song B');
  });
});

describe('ListaDupla - requisitos base', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should start empty', () => {
    const playlist = new ListaDupla();

    expect(playlist.vazia()).toBe(true);
    expect(playlist.comprimento()).toBe(0);
    expect(playlist.busca('Nope')).toBeNull();
    expect(playlist.ultimo()).toBeNull();
    expect(playlist.toString()).toBe('');
    expect(playlist.toNumberedString()).toBe('');
  });

  it('should insert at beginning and at end', () => {
    const playlist = new ListaDupla();

    playlist.insere('Song B');
    playlist.insere('Song A');
    playlist.insereFim('Song C');

    expect(playlist.toString()).toBe('Song A | Song B | Song C');
    expect(playlist.comprimento()).toBe(3);
    expect(playlist.ultimo()?.getInfo()).toBe('Song C');
  });

  it('should find first matching song with busca', () => {
    const playlist = buildPlaylist(['Intro', 'Hit', 'Hit', 'Final']);

    const found = playlist.busca('Hit');

    expect(found).not.toBeNull();
    expect(found?.getInfo()).toBe('Hit');
    expect(playlist.busca('Missing')).toBeNull();
  });

  it('should remove first matching value with retira', () => {
    const playlist = buildPlaylist(['A', 'B', 'B', 'C']);

    playlist.retira('B');
    expect(playlist.toString()).toBe('A | B | C');

    playlist.retira('B');
    expect(playlist.toString()).toBe('A | C');

    playlist.retira('X');
    expect(playlist.toString()).toBe('A | C');
  });

  it('should release all nodes with libera', () => {
    const playlist = buildPlaylist(['A', 'B', 'C']);

    playlist.libera();

    expect(playlist.vazia()).toBe(true);
    expect(playlist.comprimento()).toBe(0);
    expect(playlist.ultimo()).toBeNull();
    expect(playlist.toString()).toBe('');
  });

  it('should print list with imprime and imprimeNumerada', () => {
    const logSpy = vi.spyOn(console, 'log').mockImplementation(() => undefined);
    const playlist = buildPlaylist(['Seek and Destroy', 'Sabbath Bloody Sabbath']);

    playlist.imprime();
    playlist.imprimeNumerada();

    expect(logSpy).toHaveBeenNthCalledWith(1, 'Seek and Destroy | Sabbath Bloody Sabbath');
    expect(logSpy).toHaveBeenNthCalledWith(2, '1. Seek and Destroy\n2. Sabbath Bloody Sabbath');
  });
});

describe('ListaDupla - funcionalidades de playlist', () => {
  it('should insert song in specific position', () => {
    const playlist = buildPlaylist(['A', 'C']);

    playlist.inserePosicao('B', 2);
    expect(playlist.toString()).toBe('A | B | C');

    playlist.inserePosicao('Start', 1);
    expect(playlist.toString()).toBe('Start | A | B | C');

    playlist.inserePosicao('End', 5);
    expect(playlist.toString()).toBe('Start | A | B | C | End');
  });

  it('should ignore invalid insert positions', () => {
    const playlist = buildPlaylist(['A', 'B']);

    playlist.inserePosicao('X', 0);
    playlist.inserePosicao('Y', 4);

    expect(playlist.toString()).toBe('A | B');
  });

  it('should remove song by numeric position', () => {
    const playlist = buildPlaylist(['A', 'B', 'C', 'D']);

    playlist.retiraPosicao(2);
    expect(playlist.toString()).toBe('A | C | D');

    playlist.retiraPosicao(1);
    expect(playlist.toString()).toBe('C | D');

    playlist.retiraPosicao(2);
    expect(playlist.toString()).toBe('C');

    playlist.retiraPosicao(99);
    expect(playlist.toString()).toBe('C');
  });

  it('should move songs across positions', () => {
    const playlist = buildPlaylist(['A', 'B', 'C', 'D']);

    playlist.move(2, 4);
    expect(playlist.toString()).toBe('A | C | D | B');

    playlist.move(4, 1);
    expect(playlist.toString()).toBe('B | A | C | D');

    playlist.move(2, 2);
    expect(playlist.toString()).toBe('B | A | C | D');
  });

  it('should ignore invalid move positions', () => {
    const playlist = buildPlaylist(['A', 'B', 'C']);

    playlist.move(0, 1);
    playlist.move(1, 0);
    playlist.move(4, 1);
    playlist.move(1, 4);

    expect(playlist.toString()).toBe('A | B | C');
  });

  it('should generate numbered playlist output', () => {
    const playlist = buildPlaylist([
      'Seek and Destroy',
      "Rock and Roll Ain't Noise Pollution",
      'Sabbath Bloody Sabbath',
      'Good Times Bad Times',
    ]);

    expect(playlist.toNumberedString()).toBe(
      '1. Seek and Destroy\n' +
        "2. Rock and Roll Ain't Noise Pollution\n" +
        '3. Sabbath Bloody Sabbath\n' +
        '4. Good Times Bad Times',
    );
  });
});
