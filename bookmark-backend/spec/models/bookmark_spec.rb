require "rails_helper"

RSpec.describe Bookmark, type: :model do
  before do
    # Мокируем все HTTP-запросы по умолчанию
    stub_request(:get, /.*/).to_return(status: 200, body: "<html><head><title>Default Title</title></head></html>")
  end

  describe "validations" do
    it "is valid with valid attributes" do
      bookmark = build(:bookmark)
      expect(bookmark).to be_valid
    end

    it "is not valid without a title and failed metadata extraction" do
      stub_request(:get, /.*/).to_timeout
      bookmark = build(:bookmark, title: nil)
      expect(bookmark).not_to be_valid
      expect(bookmark.errors[:title]).to include("can't be blank")
    end

    it "is not valid without a url" do
      bookmark = build(:bookmark, url: nil)
      expect(bookmark).not_to be_valid
      expect(bookmark.errors[:url]).to include("can't be blank")
    end

    it "is not valid with an invalid url format" do
      bookmark = build(:bookmark, url: "invalid-url")
      expect(bookmark).not_to be_valid
      expect(bookmark.errors[:url]).to include("недопустимый URL")
    end

    it "is not valid with a duplicate url" do
      create(:bookmark, url: "https://example.com")
      bookmark = build(:bookmark, url: "https://example.com")
      expect(bookmark).not_to be_valid
      expect(bookmark.errors[:url]).to include("has already been taken")
    end
  end

  describe "#extract_metadata" do
    let(:valid_url) { "https://example.com" }
    let(:html_content) do
      <<~HTML
        <html>
          <head>
            <title>Example Title</title>
          </head>
        </html>
      HTML
    end

    before do
      stub_request(:get, valid_url)
        .to_return(status: 200, body: html_content)
    end

    it "extracts title from url when title is not provided" do
      bookmark = build(:bookmark, url: valid_url, title: nil)
      bookmark.valid? # triggers before_validation callback

      expect(bookmark.title).to eq("Example Title")
    end

    it "handles network errors gracefully" do
      stub_request(:get, valid_url).to_timeout

      bookmark = build(:bookmark, url: valid_url)
      expect { bookmark.valid? }.not_to raise_error
    end
  end
end
