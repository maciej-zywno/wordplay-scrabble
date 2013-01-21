require 'net/http'
require 'net/https'
require 'open-uri'
require 'nokogiri'


def open1(href)
	Nokogiri::HTML(open(URI::encode(href)))
end

list_url = "http://scrabblemania.pl/wszystkie-slowa-scrabble-literaki"
base_url = "http://scrabblemania.pl"

all = []

open1(list_url).xpath('//div[@class="content"]/a').map{ |n| "#{base_url}#{n.get_attribute('href')}" }.each{ |href|
	doc = open1(href)
	datapager_div = doc.xpath('//div[@class="datapager"]')
	one_letter_hrefs = [href]
	if datapager_div
		(one_letter_hrefs << datapager_div.xpath('./a').map{|a| "#{base_url}#{a.get_attribute('href')}" }).flatten!
	else
		puts "no pages for #{href}" 
	end
	puts "hrefs for #{href}"
	one_letter_hrefs.each{|href|puts href}
	all = all + one_letter_hrefs
}
File.open('scrabblehrefs.txt','a'){|file| all.each{|href| file.puts("#{href}\n")} }
