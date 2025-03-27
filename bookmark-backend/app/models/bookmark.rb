# app/models/bookmark.rb
class Bookmark < ApplicationRecord
  validates :title, presence: true
  validates :url,
            presence: true,
            format: { with: URI::DEFAULT_PARSER.make_regexp(%w[http https]),
                      message: "недопустимый URL" }

  before_validation :extract_metadata, if: :url_changed?

  private

  def extract_metadata
    return unless url.present? && title.blank?

    begin
      uri = URI.parse(url)
      response = Net::HTTP.get_response(uri)
      doc = Nokogiri::HTML(response.body)

      self.title = doc.title
    rescue StandardError => e
      Rails.logger.error "Failed to extract metadata: #{e.message}"
    end
  end
end
