
#include <iostream>
#include <vector>
#define INPUT_SIZE 8

using namespace std;

static int seed = 10;

int pseudo_rand() {
	seed = seed * 214013 + 2531011;
	return (seed >> 16) & 0x7FFF;
}


int subModule(const int MAP[INPUT_SIZE][INPUT_SIZE], 
	int mNumOfRows, int nNumOfCols, 
	int idxs[3], 
	const vector<int>& emptyRows, 
	const vector<int>& emptyCols) {
	int MAP2[INPUT_SIZE][INPUT_SIZE];
	for (int r = 0; r < mNumOfRows; ++r) {
		for (int c = 0; c < nNumOfCols; ++c) {
			MAP2[r][c] = MAP[r][c];
		}
	}

	for (int  i = 0; i < 3; i++)
	{
		int rowValue = emptyRows[idxs[i]];
		int colValue = emptyCols[idxs[i]];

		if (i != 1) {
			for (int r = 0; r < INPUT_SIZE; r++)
			{
				int modRowValue = rowValue - r;
				int modCOlValue = colValue;
				if (modRowValue < 0 || MAP2[modRowValue][modCOlValue] == 1) break;
				MAP2[modRowValue][modCOlValue] = 2;
			}
			for (int r = 0; r < INPUT_SIZE; r++)
			{
				int modRowValue = rowValue + r;
				int modCOlValue = colValue;
				if (modRowValue >= mNumOfRows || MAP2[modRowValue][modCOlValue] == 1) break;
				MAP2[modRowValue][modCOlValue] = 2;
			}
		}

		if (i != 2) {
			for (int c = 0; c < INPUT_SIZE; c++)
			{
				int modRowValue = rowValue ;
				int modCOlValue = colValue - c;
				if (modCOlValue < 0 || MAP2[modRowValue][modCOlValue] == 1) break;
				MAP2[modRowValue][modCOlValue] = 2;
			}
			for (int c = 0; c < INPUT_SIZE; c++)
			{
				int modRowValue = rowValue;
				int modCOlValue = colValue + c;
				if (modCOlValue >= nNumOfCols || MAP2[modRowValue][modCOlValue] == 1) break;
				MAP2[modRowValue][modCOlValue] = 2;
			}
		}
	}

	int ret = 0;
	for (int r = 0; r < mNumOfRows; ++r) {
		for (int c = 0; c < nNumOfCols; ++c) {
			if (MAP2[r][c] == 0) ++ret;
		}
	}	return ret;
}


int getSolution(const int MAP[INPUT_SIZE][INPUT_SIZE], const int mNumOfRows, const int nNumOfCols) {
	vector<int> emptyRows;
	vector<int> emptyCols;
	for (int r = 0; r < mNumOfRows; ++r) {
		for (int c = 0; c < nNumOfCols; ++c) {
			if (MAP[r][c] == 0) {
				emptyRows.push_back(r);
				emptyCols.push_back(c);
			}
		}
	}
	int ret = INPUT_SIZE * INPUT_SIZE;
	for (int i = 0; i < emptyRows.size(); i++)
	{
		for (int j = 0; j < emptyRows.size(); j++) {
			if (i == j) {
				continue;
			}
			for (int k = 0; k < emptyRows.size(); k++) {
				if (i == k || j == k) {
					continue;
				}

				int idxs[3] = { i,j,k };

				int value = subModule(MAP, mNumOfRows, nNumOfCols, idxs, emptyRows, emptyCols);
				if (ret > value) {
					//printf("(%d,%d),(%d,%d),(%d,%d)\n",
					//	emptyRows[i], emptyCols[i],
					//	emptyRows[j], emptyCols[j],
					//	emptyRows[k], emptyCols[k]);
					ret = value;
				}
			}
		}

	}
	return ret;
}


int main()
{
	int T = 100;
	for (int i = 1; i < T + 1; ++i) {
		int mNumOfRows = (pseudo_rand() % (INPUT_SIZE / 2) + INPUT_SIZE / 2);  // rows 값
		int nNumOfCols = (pseudo_rand() % (INPUT_SIZE / 2) + INPUT_SIZE / 2);  // columns 값
		int MAP[INPUT_SIZE][INPUT_SIZE]; // 지형을 표현하는 2차원 배열
		while (true) {
			int numOfEmpties = 0;
			for (int r = 0; r < mNumOfRows; ++r) {
				for (int c = 0; c < nNumOfCols; ++c) {
					if (pseudo_rand() % 3 == 0) {
						MAP[r][c] = 0;  // 빈공간
						numOfEmpties += 1;
					}

					else {
						MAP[r][c] = 1;  // 벽
					}
				}
			}
			if (numOfEmpties >= 3) break;
		}

		printf("#%d:%d\n", i, getSolution(MAP, mNumOfRows, nNumOfCols));
	}
	return 0;
}

