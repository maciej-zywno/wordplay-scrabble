require 'net/http'
require 'net/https'
require 'open-uri'
require 'nokogiri'


def open1(href)
	Nokogiri::HTML(open(href))
end

words_file_name = "words.txt"
counter_file_name = "href_counter.txt"
fetch_start_index = 0

File.open(counter_file_name,'r'){|file| fetch_start_index = file.read.to_i} if File.exists?(counter_file_name)
puts "Fetch start index : #{fetch_start_index}"

i = 0
File.open("scrabblehrefs-encoded.txt").read.each_line{|href|
	if i >= fetch_start_index
		puts "#{i} : #{href}"
		words = open1(href).xpath('//div[@class="content"]/div[1]/a').map{ |a| a.text }
		puts "words fetched"
		File.open(words_file_name,'a'){|file| file.puts words }
		puts "words written"
		File.open(counter_file_name,'w'){|file| file.puts (i + 1)}
		puts "counter written"
	else
		puts "skipping #{href} as its index #{i} is less than #{fetch_start_index}"
	end
	i += 1
}
