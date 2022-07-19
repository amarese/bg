void write(char* enc_str, int ch, int& loc) {

	int val = ch - 'a'+1;
	if (ch == ' ') {
		val = 0;
	}
	*((int*)(&(enc_str[loc >> 3]))) |= val << (loc & ((1<<3)-1));
	loc += 5;
}

void read(char* enc_str, int& ch, int& loc) {

	ch = ((*((int*)(&(enc_str[loc >> 3])))) >> ((loc & ((1 << 3) - 1)))) & ((1 << 5) - 1);
	loc += 5;
}
