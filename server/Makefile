CXX      ?= c++
CXXFLAGS ?= -std=c++17 -O2 -Wall -Wextra -Wpedantic -pthread

tbserver: main.cpp
	$(CXX) $(CXXFLAGS) -o $@ main.cpp

# Pre-compress text assets so the server can send them gzip-encoded with no runtime cost.
gzip:
	cd ../web && find . -type f \( -name '*.html' -o -name '*.css' -o -name '*.js' -o -name '*.svg' -o -name '*.xml' -o -name '*.txt' -o -name '*.webmanifest' \) -exec gzip -9 -k -f {} \;

clean:
	rm -f tbserver

.PHONY: gzip clean
