import requests
from bs4 import BeautifulSoup
import logging
from typing import List, Dict

# Configuration du logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class SchoolScraper:
    def __init__(self):
        self.headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        }
    
    def search_school_info(self, school_code: str) -> Dict:
        """
        Scrape les informations pour ENSA ou ENSAM depuis 9rayti.com
        :param school_code: 'ensam' ou 'ensa'
        """
        base_url = "https://www.9rayti.com/groupe/ensam"
        
        # URLs spécifiques pour chaque école
        urls = [
            f"{base_url}/{school_code}",            # Page principale
            f"{base_url}/{school_code}/concours",   # Concours
            f"{base_url}/{school_code}/inscription",# Inscription
            f"{base_url}/{school_code}/seuils"      # Seuils
        ]
        
        all_info = []
        
        for url in urls:
            try:
                response = requests.get(url, headers=self.headers, timeout=10)
                if response.status_code == 200:
                    soup = BeautifulSoup(response.text, 'html.parser')
                    info = self._extract_school_info(soup, url)
                    if info:
                        all_info.append(info)
                else:
                    logger.warning(f"Page non trouvée: {url} (HTTP {response.status_code})")
            except Exception as e:
                logger.error(f"Erreur sur {url}: {str(e)}")
                continue
        
        return {
            "school": school_code.upper(),
            "sources": all_info,
            "raw_data": self._format_data(all_info)
        }
    
    def _extract_school_info(self, soup: BeautifulSoup, url: str) -> Dict:
        """Extrait le contenu de school-description et le titre de la page"""
        try:
            title = soup.find("h1").text.strip() if soup.find("h1") else "Sans titre"
            description = self._safe_extract(soup, "div.school-description")
            
            return {
                "page_title": title,
                "page_url": url,
                "description": description,
                "metadata": self._extract_metadata(soup)  # Exemple supplémentaire
            }
        except Exception as e:
            logger.error(f"Erreur d'extraction: {str(e)}")
            return None
    
    def _safe_extract(self, soup: BeautifulSoup, selector: str) -> str:
        """Extrait le texte d'un élément en sécurité"""
        element = soup.select_one(selector)
        return element.text.strip() if element else ""

    def _extract_metadata(self, soup: BeautifulSoup) -> Dict:
        """Exemple: extraire d'autres données utiles (à adapter)"""
        return {
            "last_updated": self._safe_extract(soup, "span.update-date"),
            "breadcrumbs": [b.text.strip() for b in soup.select("ol.breadcrumb li")]
        }
    
    def _format_data(self, all_info: List[Dict]) -> str:
        """Formatage pour affichage clair"""
        formatted = []
        for info in all_info:
            if info:
                formatted.append(f"### {info['page_title']} ({info['page_url']})")
                formatted.append(f"Description:\n{info['description']}\n")
                formatted.append("---")
        return "\n".join(formatted)

# Exemple d'utilisation
if __name__ == "__main__":
    scraper = SchoolScraper()
    
    # Scraping pour ENSAM
    print("=== ENSAM ===")
    ensam_result = scraper.search_school_info("ensam")
    print(ensam_result['raw_data'])
    
    # Scraping pour ENSA (remplacez 'ensa' par le code exact si différent)
    print("\n=== ENSA ===")
    ensa_result = scraper.search_school_info("ensa")
    print(ensa_result['raw_data'])