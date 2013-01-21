require 'net/http'
require 'net/https'
require 'open-uri'
require 'nokogiri'

url = "http://www.sjp.pl/slownik/lp.phtml?f_msfl=%20&f_vl=2&page="
from,to = 2741,2883

(from..to).each{|i| 
	puts "start #{i}"
	words = Nokogiri::HTML(open("#{url}#{i}")).xpath('//tr/td[1]').inject([]){ |result,w| result << w.text }
	puts "end fetch #{i}" 
	File.open('words.txt','a'){|file| words.each{|w| file.puts("#{w}\n")} }
	puts "end write #{i}" 
}
